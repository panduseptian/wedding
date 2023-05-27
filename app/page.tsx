"use client";
import Timer from "@/components/timer";
import moment from "moment";
import "moment/locale/id";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GiFlowerPot } from "react-icons/gi";
import { client } from "@/utils/service";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();

  const [welcome, setWelcome] = useState(true);

  const [kepada, setKepada] = useState<string | null>(null);
  const [tempat, setTempat] = useState<string | null>(null);
  const [ucapan, setUcapan] = useState<any[]>([]);

  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [thanks, setThanks] = useState<string | null>(null);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const data = params.get("kepada")?.split("-");
    if (data) {
      setKepada(data[0] || "Kerabat");
      setTempat(data[1] || "Tempat");
    }

    getUcapan();

    setAudio(new Audio("/sound.mp3"));
  }, []);

  const getUcapan = () => {
    client
      .from("buku_tamu")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .then(({ data, error }) => {
        if (!error) {
          setUcapan(data);
        }
      });
  };

  const kirimPesan = () => {
    client
      .from("buku_tamu")
      .insert({
        nama: nama,
        message: pesan,
      })
      .then(() => {
        getUcapan();
        setNama("");
        setPesan("");
        setThanks("Terima Kasih Atas Doa dan Ucapannya");
        setTimeout(() => {
          setThanks(null);
        }, 2000);
      });
  };

  return (
    <>
      {welcome && (
        <div
          className="w-[100vw] h-[100vh] flex bg-cover bg-center flex-col"
          style={{
            backgroundImage: "url(/img/header.jpeg)",
          }}
        >
          <div className="absolute bg-black/40 w-full h-full flex flex-col gap-5 items-center justify-end pb-10">
            <GiFlowerPot size={"70px"} color="white" />
            <div className="text-[50px] font-serif text-white">
              Aida & Rizki
            </div>
            <div className="text-white">
              Akan segera melangsungkan pernikahan pada
            </div>
            <div className="text-white text-xl font-semibold">
              {moment("2023-06-03 11:00:00").locale("id").format("dddd")},{" "}
              {moment("2023-06-03 11:00:00").locale("id").format("LL")}
            </div>
            <Timer
              targetDate={moment("2023-06-03 11:00:00").toDate().getTime()}
            />
            {/* <div className="flex text-white flex-col items-center">
              <p>Kepada</p>
              <p className="capitalize">{kepada}</p>
              <p>Di</p>
              <p className="capitalize">{tempat}</p>
            </div> */}
            <button
              className="bg-[#F67D7C] text-white px-6 py-2 rounded-full mt-10"
              onClick={() => {
                audio?.play();
                setWelcome(false);
              }}
            >
              Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* <audio src="/sound.mp3" autoPlay={true} loop={true} /> */}

      {!welcome && (
        <div className="bg-[#F8EDE7] min-h-screen min-w-full flex flex-col">
          <div className="w-full flex flex-col items-center py-10 px-5 gap-5">
            <p className="font-serif text-5xl text-[#7d3513] px-4 text-center">
              Assalamu&apos;alaikum Warahmatullah
            </p>
            <p className="text-center text-[#8d624dc5] text-sm">
              Dengan Rahmat Allah yang Maha Kuasa InsyaAllah kami akan
              melangsungkan pernikahan pada:
            </p>
            <p className="text-xl text-[#7d3513] px-4 text-center font-bold">
              {moment("2023-06-03 11:00:00").locale("id").format("dddd")},{" "}
              {moment("2023-06-03 11:00:00").locale("id").format("LL")}
            </p>
            <p className="text-center text-[#8d624dc5] text-sm">
              di Aula Kalimantan Barat, JI. Kh. Ahmad Dahlan No.11, RT.12/RW.8,
              Palmeriam Кес. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota
              Jakarta 13140
            </p>
          </div>

          <div className="flex flex-col mt-10 p-5 gap-10">
            <div className="flex flex-col gap-4 items-center text-center">
              <img
                src="/img/iki.jpeg"
                alt=""
                className="w-40 rounded-lg h-40 object-center"
              />
              <h4 className="font-bold text-[#7d3513]">Pengantin Pria</h4>
              <p className="font-serif text-2xl text-[#7d3513] px-4 text-center capitalize">
                Rizki mulianto rachman
              </p>
              <p className="text-[#8d624dc5] text-sm capitalize">
                Putra kedua dari bapak Abdurrahman (Alm) & ibu Nani Maryani
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center text-center">
              <img
                src="/img/vira.jpeg"
                alt=""
                className="w-40 rounded-lg h-40 object-left-bottom object-cover"
              />
              <h4 className="font-bold text-[#7d3513]">Pengantin Wanita</h4>
              <p className="font-serif text-2xl text-[#7d3513] px-4 text-center capitalize">
                Nuraida savira
              </p>
              <p className="text-[#8d624dc5] text-sm capitalize">
                Putri ketiga dari bapak Sidik Rachmat Mulyana & ibu Nurjanah
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center my-10 text-center text-[#7D3514] gap-5 px-5">
            <GiFlowerPot size={"70px"} color="#7D3514" />
            <p className="font-serif text-4xl">Undangan dan Acara</p>
            <p className="text-center text-[#8d624dc5] text-sm">
              Bahagia rasanya apabila anda berkenan hadir dan memberikan doa
              restu kepada kami. Kami mengundang anda untuk hadir dalam acara
              resepsi pernikahan kami berikut ini
            </p>

            <div className="flex flex-col w-full gap-4">
              <div className="bg-white rounded-md shadow-md p-5 w-full flex flex-col">
                <p className="font-bold text-lg">Akad Nikah</p>
                <div className="border-b-2 my-4"></div>
                <p className="text-xl font-bold">11:00 - Selesai</p>
                <p className="text-md text-[#8d624dc5]">Sabtu, 03 Juni 2023</p>
                <p className=" text-[#8d624dc5] mt-6">
                  Aula Kalimantan Barat, JI. Kh. Ahmad Dahlan No.11, RT.12/RW.8,
                  Palmeriam Кес. Matraman, Kota Jakarta Timur, Daerah Khusus
                  Ibukota Jakarta 13140
                </p>
              </div>
              <div className="bg-white rounded-md shadow-md p-5 w-full flex flex-col">
                <p className="font-bold text-lg">Resepsi</p>
                <div className="border-b-2 my-4"></div>
                <p className="text-xl font-bold">13:00 - Selesai</p>
                <p className="text-md text-[#8d624dc5]">Sabtu, 03 Juni 2023</p>
                <p className=" text-[#8d624dc5] mt-6">
                  Aula Kalimantan Barat, JI. Kh. Ahmad Dahlan No.11, RT.12/RW.8,
                  Palmeriam Кес. Matraman, Kota Jakarta Timur, Daerah Khusus
                  Ibukota Jakarta 13140
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center my-10 text-center text-[#7D3514] gap-5 px-5">
            <GiFlowerPot size={"70px"} color="#7D3514" />
            <p className="font-serif text-4xl">Peta lokasi</p>
            <p className="text-center text-[#8d624dc5] text-sm">
              Anda dapat menuju lokasi acara kami dengan bantuan peta dibawah
              ini. Atau anda bisa buka di
            </p>
            <Link
              href={"https://maps.app.goo.gl/zNVbtrqcahjwcVGC7"}
              target="_blank"
              className="bg-[#7D3514] text-white px-6 py-2"
            >
              Google Map
            </Link>
            <div className="bg-white rounded-md shadow-md p-5 w-full flex flex-col gap-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4181017652722!2d106.86166419999999!3d-6.208454700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f47c596c21f3%3A0x5a638cb6796842b5!2sAsrama%20Mahasiswa%20Kalimantan%20Barat!5e0!3m2!1sid!2sid!4v1685193011014!5m2!1sid!2sid"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col items-center my-10 text-center text-[#7D3514] gap-5 px-5">
            <GiFlowerPot size={"70px"} color="#7D3514" />
            <p className="font-serif text-4xl">Galeri Photo</p>

            <div className="flex flex-col gap-3">
              {[...Array(10).keys()].map((v) => (
                <div key={v}>
                  <img
                    src={`/galeri/${v + 1}.jpeg`}
                    className="w-full rounded-md"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center my-10 text-center text-[#7D3514] gap-5 px-5">
            <GiFlowerPot size={"70px"} color="#7D3514" />
            <p className="font-serif text-4xl">Kirim Kado</p>
            <div className="bg-white p-10 flex flex-col items-center rounded-md shadow-md gap-3">
              <img className="w-1/2" src="/img/bca.png" alt="" />
              <p className="capitalize">
                Nomor Rekening :{" "}
                <span className="bg-[#7D3514] text-white p-1 rounded">
                  5800346608
                </span>
                - Nuraida savira
              </p>
              <p>Atau</p>
              <p className="capitalize">
                Nomor Rekening :{" "}
                <span className="bg-[#7D3514] text-white p-1 rounded">
                  7600196311
                </span>{" "}
                - Rizki mulianto rachman
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center my-10 text-center text-[#7D3514] gap-5 px-5">
            <GiFlowerPot size={"70px"} color="#7D3514" />
            <p className="font-serif text-4xl">Kirim doa dan Ucapan</p>
            <div className="bg-white w-full p-5 rounded">
              <div className="text-left">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    value={nama}
                    onChange={(e) => setNama(e.currentTarget.value)}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="text-left mt-5">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pesan
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <textarea
                    value={pesan}
                    onChange={(e) => setPesan(e.currentTarget.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>

              {thanks && (
                <div className="w-full bg-green-200 text-green-600 py-1 text-xs mt-5 rounded">
                  {thanks}
                </div>
              )}

              <button
                className="bg-[#7D3514] px-6 py-2 text-white text-xs rounded mt-5 w-full"
                onClick={kirimPesan}
              >
                Kirim Ucapan
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center my-10 text-center text-[#7D3514] gap-5 px-5">
            <GiFlowerPot size={"70px"} color="#7D3514" />
            <p className="font-serif text-4xl">Doa dan Ucapan</p>
          </div>

          <div className="grid grid-cols-1 p-5 gap-2">
            {ucapan.length > 0 &&
              ucapan.map((v) => (
                <div key={v.id} className="bg-white p-4 rounded-md">
                  <p className="text-[#7D3514] font-semibold">
                    {v.nama}
                    {v.alamat ? ` - ${v.alamat}` : ""}
                  </p>
                  <p className="text-[#8d624dc5]">{v.message}</p>
                  <div className="border-b my-3"></div>
                  <p className="text-[#8d624dc5] text-sm">
                    {moment(v.created_at).format("LLLL")}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
