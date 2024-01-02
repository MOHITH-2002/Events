import { auth } from "@clerk/nextjs";
import Eventform from "../../../_components/Event-form";



const EventCreate = () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
  return (<>
  <section className="pt-20">
    <div className="flex h-20 items-center justify-center bg-[#F5F5F5] dark:bg-accent">
    <h3 className="text-3xl  font-bold md:text-5xl">Update Event</h3>

    </div>
  </section>
  <div className="wrapper">
    <Eventform userId={userId} type="Update" />
  </div>
  </>
  );
};

export default EventCreate;
