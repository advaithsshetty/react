import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - Goat`;
        } else {
            document.title = 'Goat | The Perfect Audio Store';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
