import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';
import { axiosPost, axiosPost2 } from "./ajaxHook";
import { useSidebarStates } from "./store";

const getLogin = (payLoad?: any) => {
    const url = "/api/login";
    return axiosPost(url, payLoad);
};

export const useLogin: any = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: getLogin,
        onSuccess: (data) => {
            if (data.status === false) {
                toast.error('🦄 ' + data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } else if (data.errors) {
                data.errors.map((value: any) => {
                    toast.error('🦄 ' + value.msg, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                })
            }
            if (data.user) {
                toast.success('🦄 ' + data.message, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    onClose: () => {
                        setTimeout(() => {
                            navigate('/')
                        }, 50)
                    }
                });
            }
        },
    });
};

const getSaveUser = (payLoad?: any) => {
    const url = "/api/main/google-login";
    return axiosPost2(url, payLoad);
};

export const useSaveUser: any = () => {
    const navigate = useNavigate()
    const { toggleSidebarState } = useSidebarStates()
    return useMutation({
        mutationFn: getSaveUser,
        onSuccess: (data) => {
            if (data.status) {
                toggleSidebarState(false)
                navigate("/")
            }
        },
    });
};

const getSavePerformanceForm = (payLoad?: any) => {
    const url = "/api/performance/performance-management";
    return axiosPost2(url, payLoad);
};

export const useSavePerformanceForm: any = () => {
    return useMutation({
        mutationFn: getSavePerformanceForm,
        onSuccess: (data) => {
            console.log(data)
        },
    });
};

const getPerformanceRating = (payLoad?: any) => {
    const url = "/api/performance/get-performance-rating";
    return axiosPost2(url, payLoad);
};

export const useGetPerformanceRating: any = () => {
    return useMutation({
        mutationFn: getPerformanceRating,
        onSuccess: (data) => {
            console.log(JSON.parse(data.pm_ratings[0].rating))
        },
    });
};