import { Message } from "../../src/types/Message";

export const GET_ALL_MESSAGES_EXPECTED_DATA: Partial<Message>[] = [{
    userId: "111399809529321201",
    msgId: "970a284d-da25-4c95-833a-9b6bf124c5a8",
    msgContent: "Testing",
}];

export const GET_MESSAGE_BY_ID_EXPECTED_DATA: Message = {
    userId: "111399809529321201",
    msgId: "970a284d-da25-4c95-833a-9b6bf124c5a8",
    msgContent: "Testing",
    broadLat: "34.5",
    broadLon: "37.5",
    specificLat: "34.5",
    specificLon: "37.5",
    timeSent: 3600
};

export const GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA: Message[] = [{
    userId: "111399809529321201",
    msgId: "970a284d-da25-4c95-833a-9b6bf124c5a8",
    msgContent: "Testing",
    broadLat: "34.5",
    broadLon: "37.5",
    specificLat: "34.5",
    specificLon: "37.5",
    timeSent: 3600
}];

export const GET_MESSAGE_BY_BROAD_COORDINATES_EXPECTED_DATA: Message[] = [{
    userId: "111399809529321201",
    msgId: "970a284d-da25-4c95-833a-9b6bf124c5a8",
    msgContent: "Testing",
    broadLat: "34.5",
    broadLon: "37.5",
    specificLat: "34.5",
    specificLon: "37.5",
    timeSent: 3600
}];

export const POST_MESSAGE_WITH_CORRECT_DATA_FORMAT: Message = {
    userId: "Hefy",
	msgId: "772244fdf",
	msgContent: "Bruhdfdfd1fdfd000",
	broadLat: "35.6",
	broadLon: "34.3",
	specificLat: "35.6",
	specificLon: "34.3",
	timeSent: 5000
}

export const POST_MESSAGE_WITH_INCORRECT_DATA_FORMAT: Partial<Message> = {
    userId: "Hefy",
	msgId: "772244fdf",
	msgContent: "Bruhdfdfd1fdfd000",
	broadLat: "35.6",
	broadLon: "34.3",
	specificLat: "35.6",
	specificLon: "34.3",
}

export const CORRECT_MESSAGE_ID = "970a284d-da25-4c95-833a-9b6bf124c5a8";
export const INCORRECT_MESSAGE_ID = "970a284d-da25-4c95-833a";

