import { User } from '@/model/User.js';
import { Exception } from '@/utils/index.js';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import qs from 'qs';


type ListOptions = {
    filter : string,
    page : number,
    perPage : number,
}

type ListOf<T> = {
    data : T[],
    page : number,
    perPage : number,
    total : number,
    totalPages : number,
}

export class ApiService
{
    
    protected _client : AxiosInstance;
    
    public constructor ()
    {
        this._client = axios.create({
            baseURL: 'http://localhost:3000/',
            paramsSerializer: params => {
                return qs.stringify(params, {
                    arrayFormat: 'brackets',
                });
            },
        });
    }
    
    public async getUsers (options : Partial<ListOptions> = {}) : Promise<ListOf<User>>
    {
        const fullOptions : ListOptions = {
            page: 0,
            perPage: 10,
            filter: '',
            ...options,
        };
        
        const { status, data } = await this._client.get('users', {
            params: fullOptions,
        });
        if (status !== 200) {
            throw new Exception('Failed to get users', 1728829263214);
        }
        
        return {
            ...data,
            data: data.data.map(e => new User(e)),
        };
    }
    
    public async getUser (id : number) : Promise<User>
    {
        const { status, data } = await this._client.get(`users/${id}`);
        if (status !== 200) {
            throw new Exception('Failed to get user', 1728848574202);
        }
        
        return new User(data);
    }
    
    public async createUser (user : User) : Promise<User>
    {
        const { status, data } = await this._client.post('users', user);
        if (status !== 200) {
            throw new Exception('Failed to add user', 1728848589458);
        }
        
        return new User(data);
    }
    
    public async updateUser (user : User) : Promise<User>
    {
        const { status, data } = await this._client.put(`users/${user.id}`, user);
        if (status !== 200) {
            throw new Exception('Failed to update user', 1728848600829);
        }
        
        return new User(data);
    }
    
    public async deleteUser (userId : number) : Promise<void>
    {
        const { status } = await this._client.delete(`users/${userId}`);
        if (status !== 200) {
            throw new Exception('Failed to delete user', 1728848623705);
        }
    }
    
}
