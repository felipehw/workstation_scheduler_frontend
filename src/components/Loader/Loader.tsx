import { Box, CircularProgress, Modal, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';

export const Loader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const excludeKeys: string[] = [];

    const isFetching = useIsFetching([], {
        predicate: (query) => {
            const keys = [...query.queryKey] as string[];
            const nonExcludedQueryIsLoading =
                query.state.status === 'loading' && !excludeKeys.find((excludeKey) => keys.find((key) => excludeKey === key));
            return nonExcludedQueryIsLoading;
        },
    });

    const excludeMutationKeys: string[] = [];

    const isMutating = useIsMutating({
        predicate: (mutation) => {
            const keys = [...(mutation.options.mutationKey ?? [])] as string[];
            const nonExcludedMutationIsLoading =
                mutation.state.status === 'loading' && !excludeMutationKeys.find((excludeKey) => keys.find((key) => excludeKey === key));
            return nonExcludedMutationIsLoading;
        },
    });

    useEffect(() => {
        console.log('isFetching', isFetching);
        console.log('isMutating', isMutating);
        if (isFetching > 0 || isMutating > 0) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [isFetching, isMutating]);

    return (
        <Modal className="LoadingModal" open={isOpen}>
            <Stack
                sx={(theme) => ({
                    color: theme.palette.common.white,
                    height: '100vh',
                    justifyContent: 'center',
                })}
            >
                <Box textAlign={'center'}>
                    <CircularProgress size={32} sx={(theme) => ({ color: theme.palette.common.white })} />
                </Box>
            </Stack>
        </Modal>
    );
};
