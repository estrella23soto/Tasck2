
// export class Usuario {

//   _id:string
//   name:string;
//   email:string;
//   password:string;
//   role:string

//   // constructor(id: string, name: string, email: string, password: string, roles: string) {
//   //   this._id = id;
//   //   this.name = name;
//   //   this.email = email;
//   //   this.password = password;
//   //   this.role = roles;
//   // }



//     constructor(id: string = '', name: string = '', email: string = '', password: string = '', role: string = '') {
//       this._id = id;
//       this.name = name;
//       this.email = email;
//       this.password = password;
//       this.role = role;
//     }
// }



export class Usuario {
  _id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(id: string = '', name: string = '', email: string = '', password: string = '', role: string = '') {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}


