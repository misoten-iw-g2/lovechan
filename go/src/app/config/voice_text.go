package config

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"

	// MySQL driver
	_ "github.com/go-sql-driver/mysql"
	yaml "gopkg.in/yaml.v1"
)

// VoiceTextConfigs have configuration for each environment.
type VoiceTextConfigs map[string]*VoiceTextConfig

// Open get config by env
func (cs VoiceTextConfigs) Open(env string) (*VoiceTextConfig, error) {
	config, ok := cs[env]
	if !ok {
		return nil, fmt.Errorf("env notfound %s", env)
	}
	return config, nil
}

// VoiceTextConfig is a database configuration.
// It's save as sql-migrate schema style.
//
// see also: https://github.com/rubenv/sql-migrate
type VoiceTextConfig struct {
	Token        string `yaml:"token"`
	EmotionLevel string `yaml:"emotion_level"`
	Pitch        string `yaml:"pitch"`
	Volume       string `yaml:"volume"`
}

// NewVoiceTextConfigsFromFile reads settings from file.
func NewVoiceTextConfigsFromFile(path string) (VoiceTextConfigs, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	return NewVoiceTextConfigs(f)
}

// NewVoiceTextConfigs reads configs from io.Reader.
func NewVoiceTextConfigs(r io.Reader) (VoiceTextConfigs, error) {
	b, err := ioutil.ReadAll(r)
	if err != nil {
		return nil, err
	}
	var configs VoiceTextConfigs
	if err = yaml.Unmarshal(b, &configs); err != nil {
		return nil, err
	}
	return configs, nil
}
