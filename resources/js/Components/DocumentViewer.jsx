
import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc =
    new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();


// ============================================================
// THUMBNAIL
// ============================================================

function PageThumbnail({
    pdf,
    pageNumber,
    active,
    onClick,
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        const renderThumbnail = async () => {
            if (!pdf || !canvasRef.current) {
                return;
            }

            try {
                const pdfPage = await pdf.getPage(pageNumber);

                if (cancelled) {
                    return;
                }

                const scale = 0.18;
                const viewport = pdfPage.getViewport({ scale });

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                const devicePixelRatio = window.devicePixelRatio || 1;

                canvas.width = Math.floor(
                    viewport.width * devicePixelRatio
                );

                canvas.height = Math.floor(
                    viewport.height * devicePixelRatio
                );

                canvas.style.width = `${viewport.width}px`;
                canvas.style.height = `${viewport.height}px`;

                await pdfPage.render({
                    canvasContext: context,
                    viewport,
                    transform:
                        devicePixelRatio !== 1
                            ? [
                                  devicePixelRatio,
                                  0,
                                  0,
                                  devicePixelRatio,
                                  0,
                                  0,
                              ]
                            : null,
                }).promise;
            } catch (error) {
                if (!cancelled) {
                    console.error(
                        'Thumbnail render error:',
                        error
                    );
                }
            }
        };

        renderThumbnail();

        return () => {
            cancelled = true;
        };
    }, [pdf, pageNumber]);

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                group relative flex w-full flex-col items-center
                rounded-lg p-2 transition
                ${
                    active
                        ? 'bg-blue-600/30 ring-2 ring-blue-500'
                        : 'hover:bg-white/10'
                }
            `}
        >
            <div
                className={`
                    overflow-hidden rounded bg-white shadow-md
                    ${
                        active
                            ? 'ring-2 ring-blue-500'
                            : 'ring-1 ring-black/20'
                    }
                `}
            >
                <canvas
                    ref={canvasRef}
                    className="block"
                />
            </div>

            <span
                className={`
                    mt-1 text-xs
                    ${
                        active
                            ? 'font-semibold text-blue-300'
                            : 'text-gray-300'
                    }
                `}
            >
                {pageNumber}
            </span>
        </button>
    );
}


// ============================================================
// DOCUMENT VIEWER
// ============================================================

export default function DocumentViewer({
    open,
    file,
    title = 'Просмотр документа',
    onClose,
}) {
    const containerRef = useRef(null);

    const pdfRef = useRef(null);
    const loadingTaskRef = useRef(null);
    const renderTaskRef = useRef(null);

    const [pdf, setPdf] = useState(null);

    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(0);

    const [scale, setScale] = useState(1);

    const [showThumbnails, setShowThumbnails] =
        useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ========================================================
    // LOAD PDF
    // ========================================================

    useEffect(() => {
        if (!open || !file) {
            setPdf(null);
            setNumPages(0);
            setPage(1);
            setLoading(false);
            setError(null);

            return;
        }

        let cancelled = false;

        const loadPdf = async () => {
            try {
                setLoading(true);
                setError(null);

                setPdf(null);
                setNumPages(0);
                setPage(1);

                /*
                 * Не сохраняем старый renderTask.
                 */
                if (renderTaskRef.current) {
                    try {
                        renderTaskRef.current.cancel();
                    } catch {
                        // ignore
                    }

                    renderTaskRef.current = null;
                }

                /*
                 * Уничтожаем старый PDF.
                 */
                if (pdfRef.current) {
                    try {
                        await pdfRef.current.destroy();
                    } catch {
                        // ignore
                    }

                    pdfRef.current = null;
                }

                /*
                 * Уничтожаем старый loading task.
                 */
                if (loadingTaskRef.current) {
                    try {
                        await loadingTaskRef.current.destroy();
                    } catch {
                        // ignore
                    }

                    loadingTaskRef.current = null;
                }

                /*
                 * Начальный масштаб.
                 */
                setScale(1);

                const loadingTask =
                    pdfjsLib.getDocument({
                        url: file,
                    });

                loadingTaskRef.current = loadingTask;

                const loadedPdf =
                    await loadingTask.promise;

                if (cancelled) {
                    try {
                        await loadedPdf.destroy();
                    } catch {
                        // ignore
                    }

                    return;
                }

                pdfRef.current = loadedPdf;

                setPdf(loadedPdf);
                setNumPages(loadedPdf.numPages);
            } catch (err) {
                console.error(
                    'PDF loading error:',
                    err
                );

                if (!cancelled) {
                    setError(
                        'Не удалось открыть PDF-файл.'
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadPdf();

        return () => {
            cancelled = true;

            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel();
                } catch {
                    // ignore
                }

                renderTaskRef.current = null;
            }

            if (loadingTaskRef.current) {
                try {
                    loadingTaskRef.current.destroy();
                } catch {
                    // ignore
                }

                loadingTaskRef.current = null;
            }

            if (pdfRef.current) {
                try {
                    pdfRef.current.destroy();
                } catch {
                    // ignore
                }

                pdfRef.current = null;
            }
        };
    }, [open, file]);


    // ========================================================
    // RENDER CURRENT PAGE
    // ========================================================

    useEffect(() => {
        if (
            !pdf ||
            !containerRef.current ||
            !page
        ) {
            return;
        }

        let cancelled = false;

        const renderPage = async () => {
            try {
                /*
                 * Остановить предыдущий render.
                 */
                if (renderTaskRef.current) {
                    try {
                        renderTaskRef.current.cancel();
                    } catch {
                        // ignore
                    }

                    renderTaskRef.current = null;
                }

                const pdfPage =
                    await pdf.getPage(page);

                if (cancelled) {
                    return;
                }

                const viewport =
                    pdfPage.getViewport({
                        scale,
                    });

                const canvas =
                    document.createElement('canvas');

                const context =
                    canvas.getContext('2d');

                const devicePixelRatio =
                    window.devicePixelRatio || 1;

                canvas.width = Math.floor(
                    viewport.width *
                        devicePixelRatio
                );

                canvas.height = Math.floor(
                    viewport.height *
                        devicePixelRatio
                );

                canvas.style.width =
                    `${viewport.width}px`;

                canvas.style.height =
                    `${viewport.height}px`;

                canvas.className =
                    'block bg-white shadow-2xl';

                /*
                 * Центрируем именно PDF,
                 * а не весь контейнер.
                 */
                const container =
                    containerRef.current;

                container.innerHTML = '';

                container.style.width =
                    '100%';

                container.style.display =
                    'flex';

                container.style.justifyContent =
                    'center';

                container.style.alignItems =
                    'flex-start';

                container.appendChild(canvas);

                const renderTask =
                    pdfPage.render({
                        canvasContext: context,
                        viewport,
                        transform:
                            devicePixelRatio !== 1
                                ? [
                                      devicePixelRatio,
                                      0,
                                      0,
                                      devicePixelRatio,
                                      0,
                                      0,
                                  ]
                                : null,
                    });

                renderTaskRef.current =
                    renderTask;

                await renderTask.promise;

                if (!cancelled) {
                    renderTaskRef.current =
                        null;
                }
            } catch (err) {
                if (
                    err?.name !==
                    'RenderingCancelledException'
                ) {
                    console.error(
                        'PDF render error:',
                        err
                    );
                }
            }
        };

        renderPage();

        return () => {
            cancelled = true;

            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel();
                } catch {
                    // ignore
                }

                renderTaskRef.current = null;
            }
        };
    }, [pdf, page, scale]);


    // ========================================================
    // KEYBOARD
    // ========================================================

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeViewer();
            }

            if (
                event.key === 'ArrowLeft'
            ) {
                setPage((current) =>
                    Math.max(
                        1,
                        current - 1
                    )
                );
            }

            if (
                event.key === 'ArrowRight'
            ) {
                setPage((current) =>
                    Math.min(
                        numPages,
                        current + 1
                    )
                );
            }
        };

        window.addEventListener(
            'keydown',
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, [open, numPages]);


    // ========================================================
    // BODY SCROLL LOCK
    // ========================================================

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            'hidden';

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [open]);


    // ========================================================
    // ZOOM
    // ========================================================

    const zoomIn = () => {
        setScale((current) =>
            Math.min(
                3,
                Number(
                    (
                        current + 0.25
                    ).toFixed(2)
                )
            )
        );
    };

    const zoomOut = () => {
        setScale((current) =>
            Math.max(
                0.5,
                Number(
                    (
                        current - 0.25
                    ).toFixed(2)
                )
            )
        );
    };

    const resetZoom = () => {
        setScale(1);
    };


    // ========================================================
    // PAGE NAVIGATION
    // ========================================================

    const previousPage = () => {
        setPage((current) =>
            Math.max(
                1,
                current - 1
            )
        );
    };

    const nextPage = () => {
        setPage((current) =>
            Math.min(
                numPages,
                current + 1
            )
        );
    };


    // ========================================================
    // FULLSCREEN
    // ========================================================

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error(
                'Fullscreen error:',
                error
            );
        }
    };


    // ========================================================
    // CLOSE
    // ========================================================

    const closeViewer = async () => {
        /*
         * Если браузерный fullscreen включён,
         * сначала выходим из него.
         */
        if (document.fullscreenElement) {
            try {
                await document.exitFullscreen();
            } catch {
                // ignore
            }
        }

        /*
         * Передаём закрытие родителю.
         */
        if (onClose) {
            onClose();
        }
    };


    // ========================================================
    // DON'T RENDER
    // ========================================================

    if (!open) {
        return null;
    }


    // ========================================================
    // UI
    // ========================================================

    return (
        <div
            className="
                fixed inset-0 z-[100]
                flex h-screen w-screen
                flex-col overflow-hidden
                bg-gray-900
            "
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="
                    flex h-14 shrink-0
                    items-center
                    border-b border-white/10
                    bg-gray-950
                    px-3
                    text-white
                    shadow-lg
                "
            >

                {/* TITLE */}

                <div className="min-w-0 flex-1">
                    <div
                        className="
                            truncate
                            text-sm font-medium
                        "
                        title={title}
                    >
                        {title}
                    </div>
                </div>


                {/* CONTROLS */}

                <div
                    className="
                        flex shrink-0
                        items-center
                        gap-1
                    "
                >

                    {/* PREVIOUS */}

                    <button
                        type="button"
                        onClick={previousPage}
                        disabled={
                            page <= 1
                        }
                        className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-lg
                            hover:bg-white/10
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                        "
                        title="Предыдущая страница"
                    >
                        ‹
                    </button>


                    {/* PAGE */}

                    <div
                        className="
                            min-w-[80px]
                            text-center
                            text-sm
                            text-gray-300
                        "
                    >
                        {page} / {numPages}
                    </div>


                    {/* NEXT */}

                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={
                            page >= numPages
                        }
                        className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-lg
                            hover:bg-white/10
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                        "
                        title="Следующая страница"
                    >
                        ›
                    </button>


                    {/* SEPARATOR */}

                    <div
                        className="
                            mx-1 h-6 w-px
                            bg-white/10
                        "
                    />


                    {/* THUMBNAILS */}

                    <button
                        type="button"
                        onClick={() =>
                            setShowThumbnails(
                                (value) =>
                                    !value
                            )
                        }
                        className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-lg
                            hover:bg-white/10
                        "
                        title={
                            showThumbnails
                                ? 'Скрыть страницы'
                                : 'Показать страницы'
                        }
                    >
                        ☷
                    </button>


                    {/* ZOOM OUT */}

                    <button
                        type="button"
                        onClick={zoomOut}
                        disabled={
                            scale <= 0.5
                        }
                        className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-xl
                            hover:bg-white/10
                            disabled:opacity-30
                        "
                        title="Уменьшить"
                    >
                        −
                    </button>


                    {/* ZOOM VALUE */}

                    <button
                        type="button"
                        onClick={resetZoom}
                        className="
                            h-9 min-w-[58px]
                            rounded-lg
                            px-2
                            text-sm
                            text-gray-300
                            hover:bg-white/10
                        "
                        title="Сбросить масштаб"
                    >
                        {Math.round(
                            scale * 100
                        )}
                        %
                    </button>


                    {/* ZOOM IN */}

                    <button
                        type="button"
                        onClick={zoomIn}
                        disabled={
                            scale >= 3
                        }
                        className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-xl
                            hover:bg-white/10
                            disabled:opacity-30
                        "
                        title="Увеличить"
                    >
                        +
                    </button>


                    {/* FULLSCREEN */}

                    <button
                        type="button"
                        onClick={
                            toggleFullscreen
                        }
                        className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-lg
                            hover:bg-white/10
                        "
                        title="Полный экран"
                    >
                        ⛶
                    </button>


                    {/* CLOSE */}

                    <button
                        type="button"
                        onClick={closeViewer}
                        className="
                            ml-1
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-xl
                            text-gray-300
                            hover:bg-red-500
                            hover:text-white
                        "
                        title="Закрыть"
                    >
                        ×
                    </button>

                </div>
            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div
                className="
                    flex min-h-0
                    flex-1
                "
            >

                {/* =================================================
                    THUMBNAILS
                ================================================= */}

                {showThumbnails && (
                    <aside
                        className="
                            flex w-32
                            shrink-0 flex-col
                            overflow-y-auto
                            border-r
                            border-white/10
                            bg-gray-900
                            p-2
                        "
                    >

                        {pdf &&
                            Array.from(
                                {
                                    length:
                                        numPages,
                                },
                                (_, index) => {
                                    const pageNumber =
                                        index + 1;

                                    return (
                                        <PageThumbnail
                                            key={
                                                pageNumber
                                            }
                                            pdf={pdf}
                                            pageNumber={
                                                pageNumber
                                            }
                                            active={
                                                page ===
                                                pageNumber
                                            }
                                            onClick={() =>
                                                setPage(
                                                    pageNumber
                                                )
                                            }
                                        />
                                    );
                                }
                            )}

                    </aside>
                )}


                {/* =================================================
                    PDF AREA
                ================================================= */}

                <div
                    className="
                        min-w-0
                        min-h-0
                        flex-1
                        overflow-auto
                        bg-gray-700
                    "
                >

                    <div
                        className="
                            flex
                            min-h-full
                            min-w-full
                            items-start
                            justify-center
                            px-4
                            py-6
                            md:px-8
                        "
                    >

                        {/* LOADING */}

                        {loading && (
                            <div
                                className="
                                    flex
                                    min-h-[60vh]
                                    w-full
                                    items-center
                                    justify-center
                                "
                            >
                                <div
                                    className="
                                        rounded-lg
                                        bg-gray-900/80
                                        px-6 py-4
                                        text-sm
                                        text-white
                                        shadow-xl
                                    "
                                >
                                    Загрузка документа...
                                </div>
                            </div>
                        )}


                        {/* ERROR */}

                        {error && (
                            <div
                                className="
                                    flex
                                    min-h-[60vh]
                                    w-full
                                    items-center
                                    justify-center
                                "
                            >
                                <div
                                    className="
                                        rounded-lg
                                        bg-red-500/20
                                        px-6 py-4
                                        text-red-200
                                    "
                                >
                                    {error}
                                </div>
                            </div>
                        )}


                        {/* PDF */}

                        {!loading &&
                            !error && (
                                <div
                                    ref={
                                        containerRef
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-start
                                        justify-center
                                    "
                                />
                            )}

                    </div>
                </div>

            </div>
        </div>
    );
}

