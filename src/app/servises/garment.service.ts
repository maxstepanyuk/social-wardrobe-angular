import { Injectable } from '@angular/core';
import { Garment } from './../components/garment/garment'
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class GarmentService {

  private supabase: SupabaseClient;

  constructor(
    private supabaseService: SupabaseService

  ) {
    this.supabase = this.supabaseService.getClient();
  }

  getAllGarments(): Garment[] {
    return this.garmentList;
    // return const { data, error } = await this.supabase
    //   .from('countries')
    //   .select()
  }

  addGarment(garment: Garment)  {

  }

  getGarmentById(id: number): Garment | undefined {
    return this.garmentList.find(garment => garment.id === id)
  }

  getGarmentsByIds(ids: number[]): Garment[] {
    return this.garmentList.filter(garment => ids.includes(garment.id));
  }

  getAllGarmentsExceptIds(ids: number[]): Garment[] {
    return this.garmentList.filter(garment => !ids.includes(garment.id));
  }

  protected garmentList: Garment[] = [
    {
      id: 1,
      name: "Red Shirt",
      img: "https://media.istockphoto.com/id/1354031012/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%87%D0%B5%D1%80%D0%B2%D0%BE%D0%BD%D0%B0-%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B0-%D0%B2%D0%B8%D1%81%D0%BC%D1%96%D1%8E%D1%94-%D1%87%D0%BE%D0%BB%D0%BE%D0%B2%D1%96%D0%BA%D1%96%D0%B2-%D1%8F%D0%BA-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD-%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%D1%83-%D1%82%D1%80%D1%96%D0%B9%D0%BD%D0%B8%D0%BA-%D1%81%D0%BE%D1%80%D0%BE%D1%87%D0%BA%D0%B0-%D0%BF%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D1%8F-%D1%96%D0%B7%D0%BE%D0%BB%D1%8C%D0%BE%D0%B2%D0%B0%D0%BD%D0%B0-%D0%BD%D0%B0.jpg?s=612x612&w=0&k=20&c=eqVYF2rCPrTjtENW8gkk_A6NOFyoulZ580s_sQnzfGE=",
      type: "Top",
      date: new Date("2023-10-04"),
    },
    {
      id: 2,
      name: "Blue Jeans",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassetsprx.matchesfashion.com%2Fimg%2Fproduct%2F105%2F1423377_1.jpg&f=1&nofb=1&ipt=201530f8f3ec9ee8b48f206f98f61d1ba9cd63143ba24a419a0ba2b4a0818e2d&ipo=images",
      type: "Bottom",
      date: new Date("2023-10-05"),
    },
    {
      id: 3,
      name: "Black Jacket",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.lookastic.com%2Fblack-jacket-original-449208.jpg&f=1&nofb=1&ipt=1dd6824ff2680af3532274e4a43cc0fb3be23748b0b6bfca08139b20b054325e&ipo=images",
      type: "Jacket",
      date: new Date("2023-10-06"),
    },
    {
      id: 4,
      name: "Green Jacket",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.lookastic.com%2Fdark-green-pea-coat-original-5193477.jpg&f=1&nofb=1&ipt=5c6118b8fbd317dcd91f8d7f2f79f657b075ce2f88e684fed1f585b7a11ca203&ipo=images",
      type: "Dress",
      date: new Date("2023-10-07"),
    },
    {
      id: 5,
      name: "White Sneakers",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fxo.lulus.com%2Fimages%2Fproduct%2Fsmall-medium%2F2488822_492942.jpg&f=1&nofb=1&ipt=5c8ed14ff3c0c6897dbd3559dac5da288d7b66d9cc204cb95a8df1b23db43692&ipo=images",
      type: "Shoes",
      date: new Date("2023-10-08"),
    },
    {
      id: 6,
      name: "White Shirt",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F474x%2F1c%2F4e%2F07%2F1c4e071c6b4ab8e16c6f662adcbdd4a1.jpg&f=1&nofb=1&ipt=2b68a74d4c6bfc87c66f6dd73a9e91bb8335123d6f8b07a9915a46e7f54ed4f1&ipo=images",
      type: "Top",
      date: new Date("2023-10-09"),
    },
    {
      id: 7,
      name: "Dark Jeans",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.thrfun.com%2Fimg%2F092%2F532%2Fjeans_s1.jpg&f=1&nofb=1&ipt=244b3e6ca82de041194d10be4f57a01fbf8176180e21ade1828a4eeb27df1759&ipo=images",
      type: "Bottom",
      date: new Date("2023-10-10"),
    },
    {
      id: 8,
      name: "Jacket",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fleatherjacketoutfits.com%2Fwp-content%2Fuploads%2F2021%2F08%2F80s-A2-Flight-Vintage-Style-Military-Real-Leather-Jacket-Mens-Distressed-Brown-Pilot-Bomber-Coat-min.jpg&f=1&nofb=1&ipt=053ab9abb1a066172b2f68ebc3130f78f5202800c08cf7aef2e79b106782210d&ipo=images",
      type: "Jacket",
      date: new Date("2023-10-11"),
    },
    {
      id: 9,
      name: "Blue hoodie",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.tuj8s4GAZCeATEeUxtkffAAAAA%26pid%3DApi&f=1&ipt=77f1499bf757219329a7018a762affb15d415076540a2f6dd36a0c4be571e3d0&ipo=images",
      type: "Dress",
      date: new Date("2023-10-12"),
    },
    {
      id: 10,
      name: "Winter Boots",
      img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimage.sportsmansguide.com%2Fadimgs%2Fl%2F6%2F669200_ts.jpg&f=1&nofb=1&ipt=51b7a866b5f71172b67fd8aa1585cfd202317b51117a837ccc240019785f44f7&ipo=images",
      type: "Shoes",
      date: new Date("2023-10-13"),
    },
    {
      id: 11,
      name: "Cowboy hat",
      img: "https://www.stampede.ca/wp-content/uploads/v1-1.jpg",
      type: "Hat",
      date: new Date("2023-10-14"),
    },
    {
      id: 12,
      name: "Sweat Pants",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmina-lola.com%2Fwp-content%2Fuploads%2F2022%2F07%2FSweatpants-OVERSIZED-SWEATPANTS-ACAI-acai-Mingo.jpg&f=1&nofb=1&ipt=c3abcc02b404f1ea34cee1b37f719099590847b1d50399bd3df9ad5d512eaa45&ipo=images",
      type: "Bottom",
      date: new Date("2023-10-15"),
    },
    {
      id: 13,
      name: "Smart",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.imimg.com%2Fdata4%2FKN%2FTP%2FGLADMIN-22582208%2F1-500x500.jpg&f=1&nofb=1&ipt=e908853ef296b381d7c3e02cbded60909c2d0a29524e3c7ecb9ecab88c541ef8&ipo=images",
      type: "Jacket",
      date: new Date("2023-10-16"),
    },
    {
      id: 14,
      name: "Black Bucket hat",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F31HnYQuN8LS._SL500_.jpg&f=1&nofb=1&ipt=0e972c4a137efa14a9e6cc505ad0b96f2938a214efb0e95151e58a7576553931&ipo=images",
      type: "Hat",
      date: new Date("2023-10-17"),
    },
    {
      id: 15,
      name: "Fanny pack",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ebayimg.com%2Fimages%2Fg%2FU48AAOSwLu5eqcfJ%2Fs-l400.jpg&f=1&nofb=1&ipt=16f4321863b5cfafe90da8cf969a4992a106d135ad969edb6c27c2341feea703&ipo=images",
      type: "Bag",
      date: new Date("2023-10-18"),
    },
    {
      id: 16,
      name: "Smart pants dark",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jajaramirez.com%2Fwp-content%2Fuploads%2F2020%2F08%2F86BAB822-F62A-450C-9391-CE82D7B53C44.jpeg&f=1&nofb=1&ipt=69ac848f84147c095609ce66a614e84d232047765652264160d0c36a2d80198b&ipo=images",
      type: "Bottom",
      date: new Date("2023-10-18"),
    },
    {
      id: 17,
      name: "pale pink tee men oversize",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ebayimg.com%2Fimages%2Fg%2FVvcAAOSwu1FeVZZ4%2Fs-l300.jpg&f=1&nofb=1&ipt=cea2cf0b8e856b135d1855d9970c997848aae6d2de55aea9c89190426f04ea53&ipo=images",
      type: "Top",
      date: new Date("2023-10-18"),
    },
    {
      id: 18,
      name: "nike gotos",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff6%2Ff3%2Fc5%2Ff6f3c546d4c0155a8ac4aa23516aa23c.jpg&f=1&nofb=1&ipt=6a2e5718bb73537f3a62b324aa9f46f6be8c49dc295740594bf1921c085dd0d1&ipo=images",
      type: "Shoes",
      date: new Date("2023-10-18"),
    },
    {
      id: 19,
      name: "Converse black",
      img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fa8%2FA_classic_Black_pair_of_Converse_All_Stars_resting_on_the_Black_%2526_White_Ed._Shoebox_(1998-2002).JPG%2F170px-A_classic_Black_pair_of_Converse_All_Stars_resting_on_the_Black_%2526_White_Ed._Shoebox_(1998-2002).JPG&f=1&nofb=1&ipt=3df30d5d9150861b05f1ab5cf80031caf01f782811eb0737f8fabb99c941df04&ipo=images",
      type: "Shoes",
      date: new Date("2023-10-18"),
    },
    {
      id: 20,
      name: "Gray beanie",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F81i4reEY5GL._AC_UL1200_.jpg&f=1&nofb=1&ipt=3ba7fe520f3f40f2cda24cb889ed5b40c649c5ee2cc4bd0a244b9112668b12b0&ipo=images",
      type: "Hat",
      date: new Date("2023-10-18"),
    },
  ];
}
