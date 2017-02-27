import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class HomePageService {
  private url = 'http://localhost:5000';
  private socket;

  sendMessage(message)
  {
    this.socket.emit('add-message', message);
  }

  getMessages()
  {
    let obs = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return obs;
  }
}