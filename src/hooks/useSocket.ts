import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
//
export const useSocket = (serverPath: string) => {
    const socket = useMemo(
      () =>
        io(serverPath, {
          transports: ['websocket'],
          autoConnect: true,
        }).connect(),
      [serverPath]
    );
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    setIsOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsOnline(true);
    });
    // return socket.disconnect()
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setIsOnline(false);
    });
  }, [socket]);

  return {
    socket,
    isOnline,
  };
};
