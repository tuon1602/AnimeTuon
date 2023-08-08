import { create } from "zustand";
const useStore = create((set) => ({
  pagination: 0,
  setPagination:(state:number)=>set({pagination:state})
  
}));
export default useStore;
