import { Tooltip } from "@heroui/tooltip";
import clsx from "clsx";

export const ConversationsList = () => (
  <div className="flex-1 overflow-y-auto p-4 space-y-2">
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <span className={clsx("text-2sm w-full truncate")}>Some Title</span>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
        {
          "bg-primary-50 !border-primary": true,
        },
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <span className={clsx("text-2sm w-full truncate")}>Some Title</span>
        </div>
      </div>
    </div>
    <div className="rounded-small py-1.5 px-2 border-1 border-transparent hover:border-default hover:bg-default-100">
      {/* flex parent #1: needs min-w-0 */}
      <div className="flex justify-between min-w-0">
        {/* flex parent #2: use flex-1 + min-w-0, not w-full */}
        <div className="flex-1 min-w-0">
          {/* block or inline-block; truncate will do the rest */}
          <span className="block truncate text-2sm">
            Help with request from AI in a bit of a lengthy
            titleeeeeeeeeeeeeeeeeeeeeeeeeeee
          </span>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <div
      className={clsx(
        "rounded-small py-1.5 px-2 border-1 border-transparent cursor-pointer hover:border-default hover:bg-default-100",
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <Tooltip
            content="Help with request from AI in a bit of a lengthy title"
            delay={1500}
            placement="bottom-end"
          >
            <span className={clsx("text-2sm w-full truncate")}>
              Help with request from AI in a bit of a lengthy title
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    {/* … */}
  </div>
);
