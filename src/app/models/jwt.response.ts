export class JwtResponse {
    datauser: {
        id: number,
        name: string,
        email: string,
        accessToken: string,
        expiresIn: string
    };
    constructor() {
        this.datauser.id='';
        this.datauser.name='';
        this.datauser.email='';
        this.datauser.accessToken='';
        this.datauser.expiresIn='';
    }
}
