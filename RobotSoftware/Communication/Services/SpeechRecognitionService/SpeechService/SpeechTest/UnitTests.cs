using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using System.Diagnostics;

namespace SpeechTest
{
    [TestClass]
    public class UnitTests
    {
        [TestMethod]
        public void StaticTestInput()
        {
            var file = File.OpenRead(@"..\..\Inputs\HiThere.wav");
            SpeechService.SpeechService service = new SpeechService.SpeechService();
            var res = service.RecognizeInput(file);
            Trace.WriteLine("Recognized text: " + res);
        }
    }
}
