package config

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"

	// MySQL driver
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	yaml "gopkg.in/yaml.v1"
)

// MysqlConfigs have configuration for each environment.
type MysqlConfigs map[string]*MysqlConfig

// Open creates connection between database for each environment.
func (cs MysqlConfigs) Open(env string) (*sqlx.DB, error) {
	config, ok := cs[env]
	if !ok {
		return nil, nil
	}
	return config.Open()
}

// MysqlConfig is a database configuration.
// It's save as sql-migrate schema style.
//
// see also: https://github.com/rubenv/sql-migrate
type MysqlConfig struct {
	Datasource string `yaml:"datasource"`
	User       string `yaml:"user"`
	Password   string `yaml:"password"`
	Protocol   string `yaml:"protocol"`
	Host       string `yaml:"host"`
	Port       string `yaml:"port"`
	Database   string `yaml:"database"`
	Option     string `yaml:"option"`
}

// Open connets database.
// NOTE: supports mysql only.
func (c *MysqlConfig) Open() (*sqlx.DB, error) {
	return sqlx.Open("mysql",
		fmt.Sprintf("%s:%s@%s(%s:%s)/%s?%s",
			c.User,
			c.Password,
			c.Protocol,
			c.Host,
			c.Port,
			c.Database,
			c.Option,
		))
}

// NewMysqlConfigsFromFile reads settings from file.
func NewMysqlConfigsFromFile(path string) (MysqlConfigs, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	return NewMysqlConfigs(f)
}

// NewMysqlConfigs reads configs from io.Reader.
func NewMysqlConfigs(r io.Reader) (MysqlConfigs, error) {
	b, err := ioutil.ReadAll(r)
	if err != nil {
		return nil, err
	}
	var configs MysqlConfigs
	if err = yaml.Unmarshal(b, &configs); err != nil {
		return nil, err
	}
	return configs, nil
}
