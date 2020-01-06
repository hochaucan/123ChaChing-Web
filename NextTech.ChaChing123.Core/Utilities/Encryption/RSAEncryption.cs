﻿/*

*/

#region Usings
using System;
using System.Diagnostics.Contracts;
using System.Security.Cryptography;
using System.Text;
using Btmu.Apf.Core.Utilities.DataTypes.ExtensionMethods;
//using Btmu.Apf.Core.Utilities.Encryption.ExtensionMethods;
#endregion

namespace Btmu.Apf.Core.Utilities.Encryption
{
    /// <summary>
    /// Utility class for doing RSA Encryption
    /// </summary>
    public static class RSAEncryption
    {
        #region Public Static Functions

        /// <summary>
        /// Encrypts a string using RSA
        /// </summary>
        /// <param name="Input">Input string (should be small as anything over 128 bytes can not be decrypted)</param>
        /// <param name="Key">Key to use for encryption</param>
        /// <param name="EncodingUsing">Encoding that the input string uses (defaults to UTF8)</param>
        /// <returns>An encrypted string (64bit string)</returns>
        public static string Encrypt(string Input, string Key, Encoding EncodingUsing = null)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(Key), "Key");
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(Input), "Input");
            using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
            {
                RSA.FromXmlString(Key);
                byte[] EncryptedBytes = RSA.Encrypt(Input.ToByteArray(EncodingUsing), true);
                RSA.Clear();
                return EncryptedBytes.ToString(Base64FormattingOptions.None);
            }
        }

        /// <summary>
        /// Decrypts a string using RSA
        /// </summary>
        /// <param name="Input">Input string (should be small as anything over 128 bytes can not be decrypted)</param>
        /// <param name="Key">Key to use for decryption</param>
        /// <param name="EncodingUsing">Encoding that the result should use (defaults to UTF8)</param>
        /// <returns>A decrypted string</returns>
        public static string Decrypt(string Input, string Key, Encoding EncodingUsing = null)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(Key), "Key");
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(Input), "Input");
            using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
            {
                RSA.FromXmlString(Key);
                byte[] EncryptedBytes = RSA.Decrypt(Input.FromBase64(), true);
                RSA.Clear();
                return EncryptedBytes.ToString(EncodingUsing);
            }
        }

        /// <summary>
        /// Creates a new set of keys
        /// </summary>
        /// <param name="PrivatePublic">True if private key should be included, false otherwise</param>
        /// <returns>XML representation of the key information</returns>
        public static string CreateKey(bool PrivatePublic)
        {
            using (RSACryptoServiceProvider Provider = new RSACryptoServiceProvider())
            {
                return Provider.ToXmlString(PrivatePublic);
            }
        }

        /// <summary>
        /// Takes a string and creates a signed hash of it
        /// </summary>
        /// <param name="Input">Input string</param>
        /// <param name="Key">Key to encrypt/sign with</param>
        /// <param name="Hash">This will be filled with the unsigned hash</param>
        /// <param name="EncodingUsing">Encoding that the input is using (defaults to UTF8)</param>
        /// <returns>A signed hash of the input (64bit string)</returns>
        public static string SignHash(string Input, string Key, out string Hash, Encoding EncodingUsing = null)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(Key), "Key");
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(Input), "Input");
            using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
            {
                RSA.FromXmlString(Key);
                byte[] HashBytes = Input.ToByteArray(EncodingUsing).Hash();
                byte[] SignedHash = RSA.SignHash(HashBytes, CryptoConfig.MapNameToOID("SHA1"));
                RSA.Clear();
                Hash = HashBytes.ToString(Base64FormattingOptions.None);
                return SignedHash.ToString(Base64FormattingOptions.None);
            }
        }

        /// <summary>
        /// Verifies a signed hash against the unsigned version
        /// </summary>
        /// <param name="Hash">The unsigned hash (should be 64bit string)</param>
        /// <param name="SignedHash">The signed hash (should be 64bit string)</param>
        /// <param name="Key">The key to use in decryption</param>
        /// <returns>True if it is verified, false otherwise</returns>
        public static bool VerifyHash(string Hash, string SignedHash, string Key)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(Key), "Key");
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(Hash), "Hash");
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(SignedHash), "SignedHash");
            using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
            {
                RSA.FromXmlString(Key);
                byte[] InputArray = SignedHash.FromBase64();
                byte[] HashArray = Hash.FromBase64();
                bool Result = RSA.VerifyHash(HashArray, CryptoConfig.MapNameToOID("SHA1"), InputArray);
                RSA.Clear();
                return Result;
            }
        }

        #endregion
    }
}