import { cookies } from "next/headers";

// Add
export const dynamic = "force-dynamic";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://what-is-my-ip-murex.vercel.app"
    : "http://localhost:3000";

async function getUserIp() {
  const response = await fetch(`${BASE_URL}/api/ip`, {
    method: "POST",
    cache: "no-store",
  });

  const data = await response.json();
  return data;
}

export default async function Home() {
  const cookieStore = cookies();
  const theme = cookieStore.get("hello")?.value;
  const data = await getUserIp();

  console.log(data?.geo);
  return (
    <pre className="">
      {data?.country_name}
      <br />

      {data?.currency}

      <br />
      {data?.realIp}

      <br />
      {BASE_URL}
      <br />

      {theme}

      <br />
      {JSON.stringify(data?.geo)}
    </pre>
  );
}
