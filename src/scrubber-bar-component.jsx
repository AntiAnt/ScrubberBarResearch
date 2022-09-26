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
          {posList.map((pos, index) => {
            return (
              <Marker
                key={index}
                segmentIndex={index}
                start={pos.getStartTimePos()}
                stop={pos.getStopTimePos()}
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
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
