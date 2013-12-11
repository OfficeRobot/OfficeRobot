using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Speech.AudioFormat;
using System.Speech.Recognition;
using System.Text;

namespace SpeechService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in both code and config file together.
    public class SpeechService : ISpeechService
    {
        public string RecognizeInput(Stream input)
        {
            SpeechGrammar.LoadGrammar();
            var recognizer = new SpeechRecognitionEngine(new CultureInfo("en-US"));
            recognizer.LoadGrammar(SpeechGrammar.Grammar);

            recognizer.SetInputToAudioStream(input, new SpeechAudioFormatInfo(44100, AudioBitsPerSample.Sixteen, AudioChannel.Mono));

            // Attach event handlers.
            recognizer.SpeechRecognized +=
              new EventHandler<SpeechRecognizedEventArgs>(
                SpeechRecognizedHandler);
            recognizer.RecognizeCompleted +=
              new EventHandler<RecognizeCompletedEventArgs>(
                RecognizeCompletedHandler);

            var result = recognizer.Recognize();
            if (result == null) return "";

            return result.Text;
        }

        static void SpeechRecognizedHandler(
      object sender, SpeechRecognizedEventArgs e)
        {
            if (e.Result != null && e.Result.Text != null)
            {
                Console.WriteLine("  Recognized text =  {0}", e.Result.Text);
            }
            else
            {
                Console.WriteLine("  Recognized text not available.");
            }
        }

        static void RecognizeCompletedHandler(
      object sender, RecognizeCompletedEventArgs e)
        {
            if (e.Error != null)
            {
                Console.WriteLine("  Error encountered, {0}: {1}",
                  e.Error.GetType().Name, e.Error.Message);
            }
            if (e.Cancelled)
            {
                Console.WriteLine("  Operation cancelled.");
            }
            if (e.InputStreamEnded)
            {
                Console.WriteLine("  End of stream encountered.");
            }
        }
    }
}
