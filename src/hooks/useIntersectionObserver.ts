import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
    onIntersect: () => void,
    enabled: boolean,
    options: IntersectionObserverInit = { threshold: 0.1 }
) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onIntersect();
                }
            },
            options
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [enabled, onIntersect, options.threshold]);

    return ref;
};
