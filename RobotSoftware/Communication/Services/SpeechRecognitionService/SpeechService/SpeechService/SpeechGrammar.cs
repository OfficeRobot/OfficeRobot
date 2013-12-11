using System;
using System.Collections.Generic;
using System.Linq;
using System.Speech.Recognition;
using System.Text;
using System.Threading.Tasks;

namespace SpeechService
{
    public static class SpeechGrammar
    {
        private static Choices commands = new Choices(new string[] {"helloworld", "hi", "there", "hi there" ,"forward", "backward", "left", "right" });
        public static Grammar Grammar;

        public static void LoadGrammar()
        {
            if (Grammar != null) return;
            GrammarBuilder gb = new GrammarBuilder();
            gb.Append(commands);

            // Create the Grammar instance.
            Grammar = new Grammar(gb);
        }
    }
}
