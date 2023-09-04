import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  timerText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#FF6347",
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#FF6347",
    borderRadius: 10,
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  buttonStartPause: {
    backgroundColor: "#FF6347",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonReset: {
    backgroundColor: "#333",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 5,
  },
});
