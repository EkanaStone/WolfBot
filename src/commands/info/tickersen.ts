// import axios from "axios";
// import {
//   ApplicationCommandOptionType,
//   CommandInteractionOption,
// } from "discord.js";
// import { Command } from "../../structures/Command";

// interface FeedItem {
//   title: string;
//   url: string;
//   time_published: string;
//   authors: string[];
//   summary: string;
//   banner_image: string;
//   source: string;
//   category_within_source: string;
//   source_domain: string;
//   topics: {
//     topic: string;
//     relevance_score: string;
//   }[];
//   overall_sentiment_score: number;
//   overall_sentiment_label: string;
//   ticker_sentiment: {
//     ticker: string;
//     relevance_score: string;
//     ticker_sentiment_score: string;
//     ticker_sentiment_label: string;
//   }[];
// }

// interface ApiResponse {
//   items: string;
//   sentiment_score_definition: string;
//   relevance_score_definition: string;
//   feed: FeedItem[];
// }

// export default new Command({
//   name: "news",
//   description: "replies with the news",
//   run: async ({ interaction }) => {
//     const ticker = interaction.options.get("ticker") ?? "AAPL";
//     const apiKey = "DJQXEI4FDH27SH9V";

//     try {
//       const response = await axios.get<ApiResponse>(
//         `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${apiKey}`
//       );

//       const feed = response.data.feed;
//       if (feed.length === 0) {
//         interaction.followUp("No news found for that ticker.");
//         return;
//       }

//       const title = `Latest news for ${ticker}:\n`;

//       const newsItems = feed
//         .map(
//           (item) =>
//             `${item.title}\n${item.url}\nPublished: ${item.time_published}\nSummary: ${item.summary}\n\n`
//         )
//         .join("");

//       const message = title + newsItems;
//       interaction.followUp(message);
//     } catch (error) {
//       console.error(error);
//       interaction.followUp(
//         "An error occurred while fetching the news. Please try again later."
//       );
//     }
//   },
//   options: [
//     {
//       name: "ticker",
//       description: "The ticker symbol to get news for.",
//       type: ApplicationCommandOptionType.String,
//       required: true,
//     },
//   ],
// });

import axios from "axios";
import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
  name: "tickersen",
  description: "Get information about a stock",
  options: [
    {
      name: "symbol",
      type: ApplicationCommandOptionType.String,
      description: "The symbol of the stock to look up",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const symbol = interaction.options.get("symbol");
    const apiKey = "DJQXEI4FDH27SH9V";
    //const url = `https://www.alphavantage.co/v1/meta/symbols/${symbol}/company?apiKey=${apiKey}`;
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${apiKey}`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      if (!data || !data.logo || !data.name || !data.description) {
        interaction.deferReply();
        interaction.followUp(
          `Sorry, I couldn't find any information for the stock symbol ${symbol}.`
        );
        return;
      }

      interaction.reply({
        embeds: [
          {
            title: data.title,
            description: data.description,
            thumbnail: {
              url: data.url,
            },
          },
        ],
      });
    } catch (error) {
      interaction.deferReply();
      interaction.followUp(
        `Sorry, an error occurred while looking up information for the stock symbol ${symbol}.`
      );
      console.error(error);
    }
  },
});


