import * as dayjs from "dayjs";

export default function MoreEventData({ ev }) {
  const { venue, offers } = ev;
  const evTime = `${dayjs(ev.datetime).format("HH:mm")}`;
  return (
    <>
      <div>
        <div className="flex justify-between">
          <span>
            {venue.name} - {venue.country}/{venue.city}
          </span>
          <span>{evTime} min</span>
        </div>
      </div>

      <div>
        {offers.map((offer, idx) => {
          return (
            <div key={idx} className="my-3">
              <span className="bg-yellow-300 rounded-full py-2 px-3">
                {offer.status.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
