declare interface Decryptor {
  decryptFile(data: Uint8Array): Uint8Array[];
}

/**
 * Initialise a decryptor with given seed + auto detection
 * @param data Input Data (used for detection)
 * @param uuid UUID retrieved from App's private storage.
 */
declare function jooxFactory(data: Uint8Array, uuid: string): Decryptor | null;

export = jooxFactory;
