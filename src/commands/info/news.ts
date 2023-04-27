import axios from "axios";
import { Command } from "../../structures/Command";

export default new Command({
  name: "news",
  description: "replies with the news",
  run: async ({ interaction }) => {
    try {
      const response = await axios.get(
        "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=DJQXEI4FDH27SH9V"
      );
      const data = response.data;
      const message = `Alright alright \n\nThe top story of the day is ${data["title"]}\n ${data["url"]}`;
      interaction.followUp(message);
    } catch (error) {
      console.error(error);
      interaction.followUp(
        "Sorry, there was an error while fetching the news."
      );
    }
  },
});
