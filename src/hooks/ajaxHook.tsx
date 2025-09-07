import axios from "axios";

export async function axiosPost(url: any, payload?: any) {
    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest",
            },
        });
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function axiosPost2(url: any, payload?: any) {
    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        });
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function axiosGet(url: any, payload?: any) {
    try {
        const response = await axios.get(url, {
            params: payload,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest",
            },
        });
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function axiosGet2(url: any) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        return e;
    }
}