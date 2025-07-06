import { createSlice } from "@reduxjs/toolkit";

export interface StudentStateI {
 student_id?: string;
}

const initialState: StudentStateI = {
  student_id: undefined,
};

type StudentIDPayload = {
  payload: {student_id: string}
};

const studentSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveStudentID: (state: StudentStateI, { payload }: StudentIDPayload) => {
      state.student_id = payload.student_id;
    },
    deleteStudentID: (state) => {
      state.student_id = undefined;
    },
  },
});

export const { saveStudentID, deleteStudentID } = studentSlice.actions;

export default studentSlice.reducer;
