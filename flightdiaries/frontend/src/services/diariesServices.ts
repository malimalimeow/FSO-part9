import axios from "axios"
import type { Diary, DiaryFormValues } from "../type"
const baseUrl="/api/diaries"

const getAll= async ()=>{
    const { data }=await axios.get<Diary[]>(baseUrl)
    return data
}

const create =async(object:DiaryFormValues)=>{
    const { data } = await axios.post<Diary>(
    baseUrl,
    object
  );
  return data

}

export default {
  getAll, create
};
