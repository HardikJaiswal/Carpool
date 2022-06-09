import axios from "axios";

export default class HttpService {

    public getData(url: string): Promise<any> {
        return axios.get(url);
    }

    public patchData(url: string): Promise<any> {
        return axios.patch(url);
    }

    public postData(url: string, body: any): Promise<any> {
        return axios.post(url, body);
    }
}