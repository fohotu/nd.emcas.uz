import { usePage } from '@inertiajs/react';

export default function useLocalized() {
    const { auth } = usePage().props;

    const language = auth?.user?.language || 'uz';

    const localized = (item, field = 'title') => {
        if (!item) {
            return '';
        }

        return (
            item[`${field}_${language}`] ??
            item[`${field}_uz`] ??
            item[field] ??
            ''
        );
    };

    return {
        language,
        localized,
    };
}