using System;
using System.Text;

public class DataMasking
{
    // Define a key for XOR encryption
    private const string EncryptionKey = "SecretKey";

    // Function to mask data using XOR encryption
    public static string MaskData(string data)
    {
        byte[] dataBytes = Encoding.UTF8.GetBytes(data);
        byte[] keyBytes = Encoding.UTF8.GetBytes(EncryptionKey);
        byte[] maskedBytes = new byte[dataBytes.Length];

        for (int i = 0; i < dataBytes.Length; i++)
        {
            maskedBytes[i] = (byte)(dataBytes[i] ^ keyBytes[i % keyBytes.Length]);
        }

        return Convert.ToBase64String(maskedBytes);
    }

    // Function to unmask data using XOR encryption
    public static string UnmaskData(string maskedData)
    {
        byte[] maskedBytes = Convert.FromBase64String(maskedData);
        byte[] keyBytes = Encoding.UTF8.GetBytes(EncryptionKey);
        byte[] unmaskedBytes = new byte[maskedBytes.Length];

        for (int i = 0; i < maskedBytes.Length; i++)
        {
            unmaskedBytes[i] = (byte)(maskedBytes[i] ^ keyBytes[i % keyBytes.Length]);
        }

        return Encoding.UTF8.GetString(unmaskedBytes);
    }
}
