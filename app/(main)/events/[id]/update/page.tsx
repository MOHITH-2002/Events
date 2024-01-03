import { auth } from "@clerk/nextjs";
import Eventform from "../../_components/Event-form";
import { getEventbyId } from "@/lib/actions/event-actions";

type EventupdateProps ={
  params:{
    id:string
  }
}

const Eventupdate = async ({params:{id}}:EventupdateProps) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
    const event = await getEventbyId(id) 

  return (<>
  <section className="pt-20">
    <div className="flex h-20 items-center justify-center bg-[#F5F5F5] dark:bg-accent">
    <h3 className="text-3xl  font-bold md:text-5xl">Update Event</h3>

    </div>
  </section>
  <div className="wrapper">
    <Eventform userId={userId} type="Update" event={event} eventId={event._id} />
  </div>
  </>
  );
};

export default Eventupdate;
