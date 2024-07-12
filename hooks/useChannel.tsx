"use client";

import { useEffect, useState } from "react";

interface Message {
  id?: number;
  type?: string;
  role?: string;
  data?: any;
}

interface Channel extends BroadcastChannel {
  id?: number;
  listeners?: Set<number>;
}

function useChannel(role: string = "consumer", initial: any = null) {
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const [data, setData] = useState<{ music: string }[]>([initial]);
  const createId = function () {
    let id = Number(localStorage?.getItem?.("music"));
    if (!id) {
      id = 0;
    }
    id++;
    localStorage.setItem("music", id.toString());
    return id;
  };
  const sendMsg = function (msg: Partial<Message>, channel: Channel) {
    channel.postMessage({ id: channel.id, ...msg });
  };

  useEffect(
    function () {
      const createChannel = function () {
        const channel: Channel = new BroadcastChannel("music") as Channel;
        if (!channel.id) channel.id = createId();
        if (!channel.listeners) channel.listeners = new Set();
        sendMsg({ type: "create", role }, channel);
        window.addEventListener("beforeunload", function () {
          sendMsg({ type: "delete" }, channel);
        });
        channel.addEventListener("message", function (e) {
          const { type, role: reciveRole, id, data: reciveData } = e.data;
          if (type === "create" && reciveRole === "listener") {
            console.log("listener create");
            sendMsg({ type: "confirm", role }, channel);
            channel?.listeners?.add(id);
          } else if (type === "create") {
            console.log("consumer create");
            sendMsg({ type: "confirm", role }, channel);
          } else if (type === "confirm" && reciveRole === "listener") {
            console.log("consumer recive listener");
            channel?.listeners?.add(id);
          } else if (type === "delete") {
            channel?.listeners?.delete(id);
          }
          if (reciveData) {
            setData?.((d) => [...d, { music: reciveData }]);
          }
        });
        return channel;
      };
      setChannel(createChannel());
    },
    [role]
  );

  return { channel, sendMsg, data, setData };
}

export default useChannel;
