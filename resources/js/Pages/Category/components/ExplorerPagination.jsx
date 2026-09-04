import { Link } from "@inertiajs/react";

export default function ExplorerPagination({

    pagination = {}

}) {

    if (!pagination.links || pagination.links.length <= 3)
        return null;

    return (

        <div className="flex items-center justify-between border-t bg-white px-5 py-3">

            <div className="text-sm text-gray-500">

                Показано

                <span className="font-semibold mx-1">

                    {pagination.from ?? 0}

                </span>

                -

                <span className="font-semibold mx-1">

                    {pagination.to ?? 0}

                </span>

                из

                <span className="font-semibold mx-1">

                    {pagination.total ?? 0}

                </span>

            </div>

            <div className="flex items-center gap-1">

                {pagination.links.map((link, index) => {

                    const label = link.label
                        .replace("&laquo; Previous", "«")
                        .replace("Next &raquo;", "»");

                    return (

                        <Link
                            key={index}
                            href={link.url || "#"}
                            preserveScroll
                            className={`
                                min-w-9
                                h-9
                                flex
                                items-center
                                justify-center
                                border
                                rounded
                                transition

                                ${
                                    link.active
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : ""
                                }

                                ${
                                    !link.active
                                        ? "hover:bg-gray-100"
                                        : ""
                                }

                                ${
                                    !link.url
                                        ? "opacity-50 pointer-events-none"
                                        : ""
                                }
                            `}
                        >

                            <span
                                dangerouslySetInnerHTML={{
                                    __html: label,
                                }}
                            />

                        </Link>

                    );

                })}

            </div>

        </div>

    );

}