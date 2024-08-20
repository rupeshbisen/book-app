export interface BookTypes {
    id: number;
    author: string;
    country: string;
    language: string;
    link: string;
    pages: string;
    title: string;
    year: string;
}

export interface PaginationTypes {
    sortDirection: string;
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalElements: number;
}