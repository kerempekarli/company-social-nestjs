export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export class PaginationResult<T> {
    constructor(
        public data: T[],
        total: number,
        page: number,
        limit: number,
    ) {
        this.meta = {
            total,
            page,
            limit,
            hasMore: total > page * limit,
        };
    }

    meta: PaginationMeta;
}
