// Base Url for API
import * as signalR from "@microsoft/signalr";

const baseUrl = import.meta.env.VITE_API_HOST;
export const ConnectToSignalR = () => {
  const newConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${baseUrl}/chatHub`)
    .withAutomaticReconnect()
    .build();
  return newConnection;
};
