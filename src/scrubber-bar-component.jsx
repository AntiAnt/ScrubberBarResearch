import { Marker } from "./marker";

export const ScrubberBar = ({
  elapsedTime,
  posList,
  eventspot,
  onTimeUpdate = { onTimeUpdate },
}) => {
  return (
    <div>
      <div
        style={{
          width: "50em",
          height: "1em",
          backgroundColor: "lightgrey",
          margin: "1em",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          {posList.map((pos, i) => {
            return (
              <Marker
                key={i}
                start={pos.startPos}
                stop={pos.stopPos}
                onClick={eventspot}
                onTimeUpdate={onTimeUpdate}
              />
            );
          })}
          <div
            style={{
              width: ".2em",
              backgroundColor: "red",
              height: "1em",
              borderRadius: ".4em",
              left: `${elapsedTime}em`,
              position: "absolute",
              // zIndex: "3"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
