import config from "../config";

type HeadersInit = [string, string][] | Record<string, string> | Headers;
type Endpoint =
    | "auth/login"
    | "auth/me"
    | "menu"
    | `menu/${number}`
    | "order"
    | `order/${number}`
    | "restaurant"
    | `restaurant/${number}`
    | "user"
    | `user/${number}`
    | `user/${number}/orders`
    | `cart`
    | `cart/${number}`;

class requestHandler {
    private static readonly _url = config.apiUrl;

    public static async get<T>(
        endpoint: Endpoint,
        headers: HeadersInit = { "Content-Type": "application/json" }
    ): Promise<T> {
        const options: RequestInit = {
            method: "GET",
            headers,
        };
        const req = await this.fetch<T>(this._url + endpoint, options).catch(err => {
            throw new Error(err);
        });
        return req;
    }

    public static async post<T>(
        endpoint: Endpoint,
        body: any | FormData,
        headers: HeadersInit = { "Content-Type": "application/json" }
    ): Promise<T> {
        const options: RequestInit = {
            method: "POST",
            headers,
            body: body instanceof FormData ? body : JSON.stringify(body),
        };
        const req = await this.fetch<T>(this._url + endpoint, options).catch(err => {
            throw new Error(err);
        });
        return req;
    }

    public static async put<T>(
        endpoint: Endpoint,
        body: any | FormData,
        headers: HeadersInit = { "Content-Type": "application/json" }
    ): Promise<T> {
        const options: RequestInit = {
            method: "PUT",
            headers,
            body: JSON.stringify(body),
        };
        const req = await this.fetch<T>(this._url + endpoint, options).catch(err => {
            throw new Error(err);
        });
        return req;
    }

    public static async patch<T>(
        endpoint: Endpoint,
        body: any | FormData,
        headers: HeadersInit = { "Content-Type": "application/json" }
    ): Promise<T> {
        const options: RequestInit = {
            method: "PATCH",
            headers,
            body: JSON.stringify(body),
        };
        const req = await this.fetch<T>(this._url + endpoint, options).catch(err => {
            throw new Error(err);
        });
        return req;
    }

    public static async delete<T>(
        endpoint: Endpoint,
        headers: HeadersInit = { "Content-Type": "application/json" }
    ): Promise<T> {
        const options: RequestInit = {
            method: "DELETE",
            headers,
        };
        const req = await this.fetch<T>(this._url + endpoint, options).catch(err => {
            throw new Error(err);
        });
        return req;
    }

    private static async fetch<T>(url: string, options?: RequestInit): Promise<T> {
        const req = await fetch(url, options);
        const json: any = await req.json();
        if (req.status < 200 || req.status > 299) throw new Error(json.message);

        return json;
    }
}

export default requestHandler;
