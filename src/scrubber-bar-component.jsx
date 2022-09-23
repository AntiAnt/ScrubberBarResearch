import { Marker } from "./marker";

export const ScrubberBar = ({
  elapsedTime,
  posList,
  eventspot,
  onTimeUpdate,
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
          {!!posList && posList.map((pos, index) => {
            return (
              <Marker
                key={index}
                segmentIndex={index}
                start={pos.startPos}
                stop={pos.stopPos}
                onClick={!! eventspot && eventspot}
                onTimeUpdate={!!onTimeUpdate && onTimeUpdate}
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
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
