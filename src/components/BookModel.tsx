import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BookTypes } from "../types/BooksTypes";
import { addBook, editBook } from "../services/BookServices";

export default function BookModel(props: { show: any; toggle: any, book: any, }) {
    const { show, toggle, book, } = props;

    const [defaultParams] = useState<BookTypes>({
        id: 0,
        author: '',
        country: '',
        language: '',
        link: '',
        pages: '',
        title: '',
        year: ''
    });
    const [params, setParams] = useState<BookTypes>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    }

    const generateRandomId = () => {
        return Math.floor(Math.random() * 1000);
    };

    const saveBook = async () => {
        if (!params.title) {
            showMessage('Book title is required.', 'error');
            return true;
        }
        if (!params.author) {
            showMessage('Book author name is required.', 'error');
            return true;
        }
        if (!params.country) {
            showMessage('Country name is not valid.', 'error');
            return true;
        }
        if (!params.year) {
            showMessage('book published year is required.', 'error');
            return true;
        }
        if (!params.language) {
            showMessage('book language is required.', 'error');
            return true;
        }
        if (!params.link) {
            showMessage('book link is required.', 'error');
            return true;
        }
        if (!params.pages) {
            showMessage('book pages is required.', 'error');
            return true;
        }
        debugger
        let bookData = {
            title: params.title,
            author: params.author,
            country: params.country,
            year: params.year,
            language: params.language,
            link: params.link,
            pages: params.pages,
        };

        let newBookData: BookTypes = {
            ...bookData,
            id: generateRandomId(),
        }

        let editBookData: BookTypes = {
            ...bookData,
            id: params.id,
        }
        
        if (params.id) {
            //update member
            const res = await editBook(params.id, editBookData);
            console.log("params.id", params.id)
            debugger
            if (res) {
                if (res.status === 200) {
                    showMessage(res.message, 'success');
                } else {
                    showMessage("Failed to update member", 'error');
                }
            }
        } else {
            //add member
            const res = await addBook(newBookData);
            console.log("add", res)
            if (res.status === 200) {
                showMessage(res.message, 'success');
                setParams(defaultParams);
            } else {
                setParams(defaultParams);
                showMessage("Failed to add book", 'error');
            }
        };
        toggle()
    };

    useEffect(() => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (book) {
            let json = JSON.parse(JSON.stringify(book));
            setParams(json);
        }
    }, [defaultParams, book])

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
    return (
        <div>
            <div className={`modal fade  ${show ? 'show' : ''}`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={Number(-1)} aria-labelledby="staticBackdropLabel" aria-hidden={!show} style={{ display: show ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{params.id ? 'Edit Book' : 'Add New Book'}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={toggle}></button>
                        </div>
                        <div className="modal-body">
                            <form className="mt-2 px-2 memberform">
                                <div className="mb-2">
                                    <label htmlFor="title" className="form-label">Title<span className="mandatory">*</span></label>
                                    <input
                                        id="title"
                                        type="text"
                                        placeholder="Enter Title"
                                        className="form-control"
                                        value={params.title}
                                        onChange={(e) => changeValue(e)}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="author" className="form-label">Author<span className="mandatory">*</span></label>
                                    <input
                                        id="author"
                                        type="text"
                                        placeholder="Enter Author"
                                        className="form-control"
                                        value={params.author}
                                        onChange={(e) => changeValue(e)}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="country" className="form-label">Country<span className="mandatory">*</span></label>
                                    <input
                                        id="country"
                                        type="text"
                                        placeholder="Enter Country"
                                        className="form-control"
                                        value={params.country}
                                        onChange={(e) => changeValue(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="year" className="form-label">Year</label>
                                    <input
                                        id="year"
                                        type="text"
                                        placeholder="Enter Year"
                                        className="form-control"
                                        value={params.year}
                                        onChange={(e) => changeValue(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="language" className="form-label">Language</label>
                                    <input
                                        id="language"
                                        type="text"
                                        placeholder="Enter Language"
                                        className="form-control"
                                        value={params.language}
                                        onChange={(e) => changeValue(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="link" className="form-label">Link</label>
                                    <input
                                        id="link"
                                        type="text"
                                        placeholder="Enter Link"
                                        className="form-control"
                                        value={params.link}
                                        onChange={(e) => changeValue(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pages" className="form-label">Pages</label>
                                    <input
                                        id="pages"
                                        type="text"
                                        placeholder="Enter Pages"
                                        className="form-control"
                                        value={params.pages}
                                        onChange={(e) => changeValue(e)}
                                    />
                                </div>
                                <div className="d-flex flex-column flex-sm-row justify-content-center align-items-sm-center bg-light py-2 mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={saveBook}
                                    >
                                        {params.id ? 'Update' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </div>
    )
}
