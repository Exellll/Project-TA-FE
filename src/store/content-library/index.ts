import { createSlice } from "@reduxjs/toolkit";

export interface NavigationStateI {
 id?: string;
 name?: string; 
}

export interface ContentLibraryStateI {
  navigation: NavigationStateI[];
}

const initialState: ContentLibraryStateI = {
  navigation: [],
};

type ContentLibraryIDPayload = {
  payload: {id: string, name: string};
};

const contentLibrarySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveContentLibraryID: (state: ContentLibraryStateI, { payload }: ContentLibraryIDPayload) => {
      state.navigation = [...state.navigation, payload]; 
    },
    deleteContentLibraryID: (state) => {
      state.navigation.pop();
    },
  },
});

export const { saveContentLibraryID, deleteContentLibraryID } = contentLibrarySlice.actions;

export default contentLibrarySlice.reducer;
