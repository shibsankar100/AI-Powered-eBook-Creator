import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Book } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import ViewBook from "../components/view/ViewBook";

const ViewBookSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-96 bg-slate-200 rounded-lg"></div>
                <div className="md:col-span-2 space-y-5">
                    <div>
                        <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                        <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                        <div className="h-20 bg-slate-200 rounded w-full"></div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="h-6 bg-slate-200 rounded w-32"></div>
                        <div className="h-12 bg-slate-200 rounded w-full"></div>
                        <div className="h-12 bg-slate-200 rounded w-full"></div>
                        <div className="h-12 bg-slate-200 rounded w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const ViewBookPage = () => {

    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { bookId } = useParams();


    useEffect(() => {

        const fetchBook = async () => {

            try {
                setIsLoading(true);

                const response = await axiosInstance.get(
                    `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
                );

                setBook(response.data);

            } catch (error) {

                console.error("Failed to fetch eBook:", error);

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to fetch eBook."
                );

                setBook(null);

            } finally {

                setIsLoading(false);

            }
        };


        if (bookId) {
            fetchBook();
        } else {
            setIsLoading(false);
        }

    }, [bookId]);


    return (
        <DashboardLayout>

            {isLoading ? (

                <ViewBookSkeleton />

            ) : book ? (

                <ViewBook book={book} />

            ) : (

                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">

                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">

                        <Book
                            size={32}
                            className="text-slate-400"
                        />

                    </div>

                    <h3 className="text-xl font-semibold text-slate-800">
                        eBook Not Found
                    </h3>

                    <p className="text-slate-500 mt-2 max-w-md">
                        The eBook you are looking for does not exist
                        or you do not have permission to view it.
                    </p>

                </div>

            )}

        </DashboardLayout>
    );
};


export default ViewBookPage;