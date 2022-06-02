import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from "socket.io-client";
import { AuthService } from 'src/app/core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  exceptionsArray: any;
  // completedExceptionsArray: any;
  userId: any = "";
  @Output() UpdateExceptions: EventEmitter<any> = new EventEmitter();
  // @Output() CompletedExceptions: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {
    this.userId = authService.userId;
   }
   setSocketConnection(): void {
    let param = {
      path: "/remc",
      forceNew: true,
      reconnectionAttempts: 3,
      timeout: 2000,
      transports: ["websocket"]
    };
    if (!!!this.socket) {
      this.socket = io.io(`${environment.socketUrl}`, param);

      this.socket.emit("userinfo", { customId: this.userId });

      this.socket.on("getNewexceptions", (list: string[]) => {
        console.log(list);
        this.updateExceptions(list);
      });
      // this.socket.on("deletedException", (list: string[]) => {
      //   console.log(list);
      //   this.completedExceptions(list);
      // });
    }
  }

  disconnectSocketConnection() {
    if (!!this.socket) {
      // this.socket.emit("disconnect");
      this.socket.disconnect();
      this.socket = null;
    }
  }
  // broadcast
  // async getNewexceptions() {
  //   if (!!this.socket) {
  //     await this.socket.on("getNewexceptions", (list: string[]) => {
  //       console.log(list);
  //       this.updateExceptions(list);
  //     });
  //   }
  // }

  updateExceptions(exceptionsArray: any) {
    this.setexceptions(exceptionsArray);
    this.UpdateExceptions.emit(exceptionsArray);
  }

  // completedExceptions(exceptionsArray: any) {
  //   this.setCompletedexceptions(exceptionsArray);
  //   this.CompletedExceptions.emit(exceptionsArray);
  // }

  setexceptions(exceptionsArray: any) {
    this.exceptionsArray = exceptionsArray;
  }

  // setCompletedexceptions(exceptionsArray: any) {
  //   this.completedExceptionsArray = exceptionsArray;
  // }
}


