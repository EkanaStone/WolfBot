import { Command } from "../../structures/Command";

export default new Command({
    name: "hello",
    description: "The Wolf will greet you!",
    run: async ({ interaction }) => {
        interaction.followUp("What do you want loser? Time is Money");
    }
});