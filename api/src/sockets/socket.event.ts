import { Server, Socket } from "socket.io";
import { addMoreBadword, badWords } from "../utils/badWords.utils";

import { loadBadwords, loadStatus } from "../utils/db.utils";
import {
  deleteTray,
  fetchAllTrays,
  fetchTraysByDeptAndPage,
  addBadWord,
  emitSettings,
  removeBadWord,
  saveTray,
  toggleReadOnly,
} from "./socket.service";

const itemsPerPage = 4;

let isReadOnly = false;

const setupSocketEvents = (io: Server) => {
  setTimeout(async () => {
    isReadOnly = (await loadStatus()) as boolean;
    addMoreBadword((await loadBadwords()) as string[]);
  }, 100);

  io.on("connection", (socket: Socket) => {
    console.log(`A client connected with ID: ${socket.id}`);

    emitSettings(socket, isReadOnly, badWords);

    socket.on("add_bad_word", async (word: string) => {
      addBadWord(word, isReadOnly);
    });

    socket.on("delete_bad_word", async (word: string) => {
      removeBadWord(socket, word, isReadOnly);
    });

    socket.on(
      "get_trays",
      async (
        page: number = 1,
        dept: string[] = [],
        degree: string[] = [],
        callback: any
      ) => {
        fetchTraysByDeptAndPage(socket, page, dept, degree, callback);
      }
    );

    socket.on("get_all_trays", async (callback) => {
      fetchAllTrays(socket, callback);
    });

    socket.on("save_tray", async (data: TrayType, callback) => {
      saveTray(io, socket, data, isReadOnly, callback);
    });

    socket.on("delete_tray", async (id: string) => {
      deleteTray(io, socket, id, isReadOnly);
    });

    socket.on("toggle_read_only", async (readOnlyStatus: boolean) => {
      //In memory
      isReadOnly = readOnlyStatus;

      //In DB
      toggleReadOnly(io, socket, readOnlyStatus);
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
};

export default setupSocketEvents;
