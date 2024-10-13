export class User
{
    
    public id : number;
    
    public firstName : string;
    public lastName : string;
    
    public avatar : string;
    
    public get fullName () : string
    {
        return `${this.firstName} ${this.lastName}`;
    }
    
    public constructor (data : Partial<User> = {})
    {
        Object.assign(this, data);
    }
    
}
