import { useEffect, useMemo, useState } from 'react'
import { searchBooks } from '../services/BookServices';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, setPaginationData } from '../store/bookSlice';
import { RootState } from '../store';
import BookModel from './BookModel';
import { FaEdit } from "react-icons/fa";
import ReactPaginate from 'react-paginate';

export default function BooksList() {

    const [search, setSearch] = useState<string>('');
    const [show, setShow] = useState(false);
    const [book, setBook] = useState<null>(null);
    const booksData = useSelector((state: RootState) => state.book.books);
    const paginationData = useSelector((state: RootState) => state.book.paginationData);

    const dispatch = useDispatch();

    const [sortDirection, setSortDirection] = useState('DESC');
    const sortedBooks = useMemo(() => {
        if (booksData.length === 0) {
            return [];
        }
        return [...booksData].sort((a, b) => {
            if (sortDirection === 'ASC') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
    }, [booksData, sortDirection])

    const [currentPage, setCurrentPage] = useState<number>(paginationData.currentPage);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const res = await searchBooks(search);
            dispatch(setBooks(res.data));
            dispatch(setPaginationData(res.pagination));
        }, 1500)
        return () => {
            clearTimeout(timeout)
        }
    }, [search, dispatch]);

    const toggle = () => {
        setBook(null);
        setShow(!show);
    };

    const editBook = (book: any = null) => {
        toggle();
        if (book) {
            setBook(book);
        }
    };

    const endOffset = currentPage + paginationData.pageSize;
    const paginatedBooks = sortedBooks.slice(currentPage, endOffset);

    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * paginationData.pageSize) % paginationData.totalElements;
        setCurrentPage(newOffset);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex gap-2 mx-auto justify-content-between pt-3 mb-4">
                <div className="position-relative col-4">
                    <input
                        type="text"
                        placeholder="Search Book by title"
                        className="form-control mb-3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='col-4'>
                    <button className="btn btn-success w-100" onClick={toggle}>Add Book</button>
                </div>
            </div>

            <h3 className='text-center mb-4'>Your Books List</h3>

            <div className='col-4 mb-3'>
                Sorting
                <select name="sort" id="sort" value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Sr. No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Country</th>
                            <th scope="col">Year</th>
                            <th scope="col">Language</th>
                            <th scope="col">Link</th>
                            <th scope="col">Pages</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedBooks && sortedBooks.length === 0 && <tr><td colSpan={9} className='text-center'>No Data Found</td></tr>
                        }
                        {paginatedBooks && paginatedBooks.map((book, index: number) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.country}</td>
                                <td>{book.year}</td>
                                <td>{book.language}</td>
                                <td>{book.link}</td>
                                <td>{book.pages}</td>
                                <td className='text-center'>
                                    <FaEdit onClick={() => editBook(book)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ReactPaginate
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={paginationData.totalPages}
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
                containerClassName='pagination'
                pageLinkClassName='page-link'
                previousLinkClassName='page-link'
                nextLinkClassName='page-link'
                activeClassName='active'
                disabledClassName='disabled'
            />


            <BookModel
                show={show}
                toggle={toggle}
                book={book}
            />
        </div>
    )
}
