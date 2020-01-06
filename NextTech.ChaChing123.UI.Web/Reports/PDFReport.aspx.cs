using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Diagnostics;
using MigraDoc.DocumentObjectModel;
using MigraDoc.Rendering;

namespace BTMU.UNF.UI.Web.Reports
{
    public partial class PDFReport : System.Web.UI.Page
    {
        string path = HttpContext.Current.Server.MapPath("/");

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                // Create a invoice form with the sample invoice data
                //InvoiceForm invoice = new InvoiceForm("E:/Projects/BTMU.UNF.Solution/BTMU.UNF.UI.Web/Reports/invoice.xml");
                InvoiceForm invoice = new InvoiceForm(@"Reports\invoice.xml");

                // Create a MigraDoc document
                Document document = invoice.CreateDocument();
                document.UseCmykColor = true;

#if DEBUG
                // for debugging only...
                MigraDoc.DocumentObjectModel.IO.DdlWriter.WriteToFile(document, "MigraDoc.mdddl");
                document = MigraDoc.DocumentObjectModel.IO.DdlReader.DocumentFromFile("MigraDoc.mdddl");
#endif

                // Create a renderer for PDF that uses Unicode font encoding
                PdfDocumentRenderer pdfRenderer = new PdfDocumentRenderer(true);

                // Set the MigraDoc document
                pdfRenderer.Document = document;

                // Create the PDF document
                pdfRenderer.RenderDocument();

                // Save the PDF document...
                string filename = "Invoice.pdf";
#if DEBUG
                // I don't want to close the document constantly...
                filename = "Invoice-" + Guid.NewGuid().ToString("N").ToUpper() + ".pdf";
#endif
                pdfRenderer.Save(path + filename);

                System.IO.Stream stream = new System.IO.MemoryStream();
                pdfRenderer.Save(stream, true);

                byte[] output = ToByteArry(stream);

                // zip PDF file(s)

                // return as byte array

                // ...and start a viewer.
                // Process.Start(filename); // open in PDF Viewer
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.ReadLine();
            }
        }

        public static byte[] ToByteArry(System.IO.Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
    }
}