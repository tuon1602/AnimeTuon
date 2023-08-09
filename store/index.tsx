import { create } from "zustand";

const useStore = create((set) => ({
  pagination: 0,
  userEmail:"",
  avatarData: "",
  setPagination:(state:number)=>set({pagination:state}),
  setUserEmail:(state:string)=>set({userEmail:state}),
  fetchAvatarData:async()=>{
    try{
      const store:any  =useStore.getState()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?email=${store.userEmail}`)
      const resData = await res.json()
      set({avatarData:resData?.data?.avatar})
    }
    catch(error){
      console.error(error);
    }
  }
  
}));
export default useStore;
