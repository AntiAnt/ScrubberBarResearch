import { Marker } from "./marker";

export const ScrubberBar = ({
  elapsedTime,
  posList,
  eventspot,
  onTimeUpdate = { onTimeUpdate },
}) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          width: "50em",
          height: "1em",
          border: ".1em solid grey",
          backgroundColor: "lightgrey",
          borderRadius: ".5em",
          margin: "1em",
        }}
      >
        {posList.map((pos, i) => {
          return (
            <Marker
              start={pos.startPos}
              stop={pos.stopPos}
              onClick={eventspot}
              i={i}
              onTimeUpdate={onTimeUpdate}
            />
          );
        })}
        <div
          style={{
            width: "0",
            height: "2em",
            border: "solid red",
            left: `${elapsedTime}em`,
            top: "-.5em",
            position: "absolute",
            zIndex: 1002,
          }}
        ></div>
      </div>
    </div>
  );
};
